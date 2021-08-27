import { styled } from '@linaria/react';
import React from 'react';
import { Image } from '../../../components/Image';

const StageItem = styled.li`
    display: grid;
    grid-template-columns: 25% 0.2rem auto;
    grid-column-gap: 1.5rem;
    position: relative;


    &::before {
        top: 0;
        left: calc(25% + 1.5rem + 0.1rem);
        content: "";
        width: 0.8em;
        height: 0.8em;
        display: flex;
        position: absolute;
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: var(--color-white);
        border: 0.25em solid var(--color-light-accent, rgb(244, 121, 124));
    }
`;

const StageSeparator = styled.div`
    background-image: linear-gradient(
        to bottom,
        var(--color-light, rgb(243, 242, 239)) 90%,
        rgba(var(--white, 255, 255, 255), 0) 100%
    );
  `;

const StageContent = styled.div`
    margin-bottom: 1.5rem;
`;


const TimelineStage: React.FC<{
    left: React.ReactNode,
    right: React.ReactNode,
}> = ({ left, right }) => (
    <StageItem>
        <StageContent>{left}</StageContent>
        <StageSeparator />
        <StageContent>{right}</StageContent>
    </StageItem>
)

const Institution: React.FC<{
    src: string;
    alt: string;
    from: string;
    to: string;
}> = ({ src, alt, from, to }) => (
    <figure className="career__institution">
        <Image src={src} alt={alt} />
        <figcaption>
            <p>{from} &mdash; {to}</p>
        </figcaption>
    </figure>
)

export const Education: React.FC = () => (
    <li className="career__group">
        <h3 className="career__group-title">Education</h3>
        <ul >
            <TimelineStage
                left={<Institution
                    src="/img/career/krnu.png"
                    alt="Kremenchuk State Polytechnical University"
                    from="Sept 2016"
                    to="Aug 2018"
                />}
                right={
                    <div className="career__education">
                        <h4 className="career__institution-name">
                            Kremenchuk State Polytechnical University
                        </h4>
                        <p className="career__education-degree">
                            Master's degree
                        </p>
                        <p className="career__education-field-of-study">
                            Automation Engineer Technology/Technician
                        </p>
                    </div>
                } />
            <TimelineStage
                left={<Institution
                    src="/img/career/altexsoft-labs.png"
                    alt="AltexSoft Labs"
                    from="Oct 2014"
                    to="Jul 2015"
                />}
                right={
                    <div className="career__education">
                        <h4 className="career__institution-name">
                            AltexSoft Lab (.NET Tech Full-Stack)
                        </h4>
                        <p className="career__education-degree">
                            Junior Software Engineer
                        </p>
                        <p className="career__education-field-of-study">
                            Full-Stack .NET (C#/ASP.NET/EF/ADO.NET/WPF) and UI (HTML5,
                            CSS3, JS, AngularJS) platforms development
                        </p>
                    </div>
                } />
            <TimelineStage
                left={<Institution
                    src="/img/career/krnu.png"
                    alt="Kremenchuk State Polytechnical University"
                    from="Sept 2012"
                    to="Aug 2016"
                />}
                right={
                    <div className="career__education">
                        <h4 className="career__institution-name">
                            Kremenchuk State Polytechnical University
                        </h4>
                        <p className="career__education-degree">
                            Bachelor's degree
                        </p>
                        <p className="career__education-field-of-study">
                            Automation Engineer Technology/Technician
                        </p>
                    </div>
                } />
        </ul>
    </li>

)
