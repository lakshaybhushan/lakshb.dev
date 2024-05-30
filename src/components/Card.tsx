import type { FC } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

interface Project {
	id: number;
	title: string;
	description: string;
	link: string;
}

interface ProjectCardProps {
	project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
	return (
		<div className="flex flex-col items-start pt-2">
			<a
				href={project.link}
				target="_blank"
				rel="noreferrer"
				className="group -mx-3 w-full rounded-lg px-3 py-2 transition-all duration-300 ease-in-out md:hover:scale-95 md:hover:bg-hoverColor">
				<h2 className="flex items-center justify-between text-sm font-medium tracking-tight text-title md:group-hover:text-primary">
					{project.title}
					<RiArrowRightUpLine className="ml-0.5 text-primary opacity-0 transition-opacity duration-150 md:group-hover:opacity-100" />
				</h2>
				<p className="text-sm text-body">{project.description}</p>
			</a>
		</div>
	);
};

export default ProjectCard;
