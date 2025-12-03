import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 ">
      <Container>

        {/* Image Centered */}
        <div className="w-full flex justify-center mb-6 ">
          <div className="w-[50%] relative border rounded-xl p-2 flex justify-center bg-gray-100">
            <img
              src={service.getFileURL(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full max-w-3xl max-h-80 object-contain"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 z-50">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500 cursor-pointer " className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500 cursor-pointer " onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/*Title Centered */}
        <h1 className="text-2xl font-bold text-center mb-4">{post.title}</h1>
        {/* Content Centered & not full width */}
        <div className="max-w-3xl mx-auto browser-css text-center">
          {parse(post.content)}
        </div>

      </Container>
    </div>
  ) : null;
}
