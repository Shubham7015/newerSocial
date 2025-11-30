import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";
import { Button, Input, Select, RTE } from "../index";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      featuredImage: post?.featuredImage || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  //  Image preview (local + uploaded)
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (post?.featuredImage) {
      const previewUrl = service.getFileURL(post.featuredImage);
      setImagePreview(previewUrl.href);
    }
  }, [post]);

  //  Submit handler
  const submit = async (data) => {
    try {
      if (!userData || !userData.$id) {
        alert("Please log in before creating or updating a post.");
        return;
      }

      let fileId = post?.featuredImage;

      //  Upload new image if selected
      if (data.image?.[0]) {
        const uploadedFile = await service.uploadFile(data.image[0]);
        if (uploadedFile?.$id) {
          if (post?.featuredImage) {
            await service.deleteFile(post.featuredImage); // delete old image
          }
          fileId = uploadedFile.$id;
          setValue("featuredImage", uploadedFile.$id);
        }
      }

      if (!fileId) {
        alert("Please upload a featured image before submitting.");
        return;
      }

      //  Create or update post
      if (post) {
        const updated = await service.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });
        if (updated) navigate(`/post/${updated.$id}`);
      } else {
        const created = await service.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });
        if (created) navigate(`/post/${created.$id}`);
      }
    } catch (error) {
      console.error("Post operation failed:", error);
    }
  };

  //  Slug generator
  const slugTransform = useCallback((value) => {
    if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s.-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+/, "")
        .slice(0, 36);
    }
    return "";
  }, []);

  // auto-update slug from title
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Preview selected image locally
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
  };

  //  UI layout
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left Section */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 cursor-pointer button"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          onChange={handleImageChange}
        />

        {/* Preview Area */}
        {imagePreview && (
          <div className="w-full mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg object-cover w-full h-64"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 cursor-pointer"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full cursor-pointer"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
