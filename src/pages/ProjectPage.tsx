import { useLayoutEffect } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectBySlug } from "@/data/projects";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = getProjectBySlug(slug);
  const cameFromSite = Boolean((location.state as { from?: string } | null)?.from);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useLayoutEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} — Simon Hildell`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <ProjectDetail
      project={project}
      onClose={() => {
        // Came from the grid or the city → step back so the browser's own back
        // button and this button do exactly the same thing. Arrived from a
        // shared link → go to the home page instead of leaving the site.
        if (cameFromSite) navigate(-1);
        else navigate("/", { replace: true });
      }}
    />
  );
};

export default ProjectPage;
