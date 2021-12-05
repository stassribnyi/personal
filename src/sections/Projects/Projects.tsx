import styled  from 'styled-components';
import React from "react";
import { ChipList, Section } from "../../components";
import { Styled } from "./Projects.styles";

const List = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    list-style: none;

    @media screen and (min-width: 768px)  {
        grid-template-columns: 1fr 1fr;
    }

    li {
        box-shadow: 2px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.2);
    }
`;

const Figure = styled.figure`
    color: white;
    position: relative;

    @media screen and (min-width: 768px)  {

        &:not(:hover) {
            figcaption { 
                display: none;
            }
        }
    }

    figcaption {
        top: 0;
        position: absolute;

        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: auto 1fr auto;

        padding: 1rem;
        background-color: rgba(44, 44, 44, 0.418);

        pointer-events: none;
    }
`;

const Image = styled.img`
        width: 100%;
        height: 100%;
        display: block; 
`;

const ProjectPreview: React.FC<{
    name: string,
    preview: string;
    description: string,
    technologies: Array<string>,
    link: string,
}> = (project) => (
    <Figure>
        <a href={project.link} aria-label={project.name}>
            <Image src={project.preview} alt={project.name} />
        </a>
        <figcaption>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ChipList items={project.technologies} />
        </figcaption>
    </Figure>
)



export const Projects: React.FC = () => {
    const projects = [
        {
            preview: 'img/projects/canvas-practice_1024.png',
            name: "HTML5 Canvas Playground",
            description: "The playground where you can find snake and tic-tac-toe game and some of the experiments with particles.",
            technologies: ['JS', 'ES6+', 'HTML 5 Canvas'],
            link: "https://stassribnyi.github.io/canvas-practice/"
        },
        {
            preview: 'img/projects/todo-list-react_1024.png',
            name: "ToDo List React",
            description: "Simple to-do list made with React and Flux.",
            technologies: ['React', 'Flux', 'Bootwatch'],
            link: "https://stassribnyi.github.io/todo-list-react/"
        },
        {
            preview: 'img/projects/image-manager_1024.png',
            name: "Image Manager",
            description: "Simple image manager made with React, Redux and basic PWA support.",
            technologies: ['React', 'Redux', 'PWA', 'Axios'],
            link: "https://stassribnyi.github.io/image-manager/"
        },
        {
            preview: 'img/projects/magic-app-redux_1024.png',
            name: "Magic App (Redux)",
            description: "Understanding and practicing with Redux state container and Parcel.",
            technologies: ['React', 'Redux', 'Parcel'],
            link: "https://stassribnyi.github.io/magic-app-redux/"
        }
    ];

    return (
        <Styled.Section id="projects" title="Projects">
            <List>
                {projects.map((project, idx) => (
                    <li key={idx}>
                        <ProjectPreview {...project} />
                    </li>
                ))}
            </List>
        </Styled.Section>
    )
}