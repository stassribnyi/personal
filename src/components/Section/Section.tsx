import React from 'react';
import { styled } from 'linaria/react';

const StyledSection = styled.section`
  padding: 7% 0;
  display: flex;
  align-items: center;
  flex-direction: column;


.section__title,
.section__content {
  width: 70%;
  margin: 0 auto;
  max-width: var(--max-content-width, 1140px);
}

.section__content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.section__title {
  font-size: 2em;
  font-weight: 400;
  line-height: 1.45;
  text-align: center;
  margin-bottom: 1.25em;
  text-transform: uppercase;
}

.section__title::after {
  content: "";
  width: 5em;
  height: 0.1em;
  display: flex;
  margin: 0.2em auto 0 auto;
  background-color: var(--color-light-accent, rgb(244, 121, 124));
}
`;

export const Section: React.FC<{ id: string, title: string, className?: string }> = ({ children, title, ...rest }) => (
  <StyledSection {...rest}>
    <h2 className="section__title">{title}</h2>
    <div className="section__content">
      {children}
    </div>
  </StyledSection>
)