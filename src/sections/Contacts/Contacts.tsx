import styled  from 'styled-components';
import React from 'react';

import { Button, Icon, Section } from '../../components';
import { IconProps } from '../../components/Icon';

const Footer = styled(Section)`
  min-height: 100vh;
  position: relative;
  color: var(--color-light, rgb(243, 242, 239));
  background-color: var(--color-dark, rgb(51, 51, 51));

  & > div {
    display: flex;
    gap: 3.675rem;
  }

  .contacts__group {
    display: flex;
    flex-direction: column;
    flex: 0 1 calc(50% - 2.5%);
  }

  .socials {
    list-style: none;
    display: flex;
    align-self: center;
    flex-direction: column;
  }

  .socials li {
    display: flex;
    margin-bottom: 0.8em;
  }

  .contacts__form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .contacts__group-title {
    font-size: 1.5em;
    font-weight: 300;
    line-height: 1.2em;
    margin-bottom: 1em;
    text-align: center;
    text-transform: uppercase;
  }

  .contacts__group-title::after {
    content: '';
    width: 10em;
    display: flex;
    height: 0.05em;
    margin: 0.1em auto 0 auto;
    background-color: var(--color-light-accent, rgb(244, 121, 124));
  }

  .contacts__form textarea {
    flex: 1;
    resize: none;
  }

  .contacts__form .input:last-of-type {
    margin-bottom: 2em;
  }

  .contacts__form .btn {
    align-self: center;
  }

  .contacts__title {
    font-size: 2em;
    font-weight: 400;
    line-height: 1.45;
    text-align: center;
    margin-bottom: 1.25em;
    text-transform: uppercase;
  }

  .contacts__title::after {
    content: '';
    width: 5em;
    height: 0.1em;
    display: flex;
    margin: 0.2em auto 0 auto;
    background-color: var(--color-light-accent, rgb(244, 121, 124));
  }

  @supports (padding: max(0px)) {
    .contacts {
      padding-bottom: max(4em, env(safe-area-inset-bottom));
    }
  }
`;

const InputContainer = styled.div`
  /*-----------------------------*/
  /*------------INPUTS-----------*/
  /*-----------------------------*/

  /* .input { */
  display: flex;
  margin-bottom: 1em;
  flex-direction: column;
  /* } */

  label {
    margin-bottom: 0.5em;
  }

  input,
  select,
  textarea {
    min-width: 6em;
    display: inline-flex;
    padding: 0.4em 0.6em;

    font-size: 1em;
    font-weight: 400;
    text-decoration: none;
    color: var(--color-dark, rgb(51, 51, 51));

    outline: none;
    background-color: var(--color-light, rgb(243, 242, 239));
    border: 0.1em solid var(--color-dark-accent, rgb(50, 89, 99));
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;

const TextField: React.FC<{
  id?: string;
  as?: 'input' | 'textarea';
  type?: 'text';
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
}> = ({ id, label, placeholder, value, as, type, required }) => {
  const Input = as || 'input';

  return (
    <InputContainer>
      {label && <label htmlFor={id}>{label}</label>}
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        type={type}
        required={required}
      />
    </InputContainer>
  );
};

const SelectField: React.FC<{
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
}> = ({ children, id, label, placeholder, value }) => {
  return (
    <InputContainer>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} name={id} placeholder={placeholder} value={value}>
        {children}
      </select>
    </InputContainer>
  );
};

const LinkIcon = styled(Icon)`
  width: 1em;
  font-size: 2em;
  text-align: center;
`;

const Link = styled.a`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-light, rgb(243, 242, 239));

    gap: 0.2em;
    padding-bottom: 0.2em;
    transition: color 0.5s;
  }

  &:link:hover,
  &:visited:hover {
    position: relative;
    color: var(--color-light-accent, rgb(244, 121, 124));
  }

  &:link:before,
  &:visited:before {
    content: '';
    width: 100%;
    height: 0.1em;

    left: 0;
    bottom: 0;
    display: block;
    position: absolute;

    background-color: transparent;
    transition: background-color 1s;
  }

  &:link:hover::before,
  &:link:visited::before {
    background-color: currentColor;
  }
`;

export const Contacts: React.FC = () => {
  const LINKS: {
    href: string;
    label: string;
    icon: IconProps['name'];
    ariaLabel: string;
  }[] = [
    {
      href: 'https://www.linkedin.com/in/stassribnyi',
      label: 'linkedin.com/in/stassribnyi',
      icon: 'logo-linkedin',
      ariaLabel: 'LinkedIn',
    },
    {
      href: 'mailto:stas.sribnyi@gmail.com',
      label: 'stas.sribnyi@gmail.com',
      icon: 'at',
      ariaLabel: 'E-Mail',
    },
    {
      href: 'https://github.com/stassribnyi',
      label: 'github.com/stassribnyi',
      icon: 'logo-github',
      ariaLabel: 'GitHub',
    },
    {
      href: 'https://instagr.am/stas.sribnyi',
      label: 'instagr.am/stas.sribnyi',
      icon: 'logo-instagram',
      ariaLabel: 'Instagram',
    },
    {
      href: 'https://www.fb.com/stassribnyi',
      label: 'fb.com/stassribnyi',
      icon: 'logo-facebook',
      ariaLabel: 'Facebook',
    },
  ];

  return (
    <Footer id='contacts' title='Contacts'>
      <div className='contacts__group'>
        <h3 className='contacts__group-title'>Links</h3>
        <ul className='socials'>
          {LINKS.map(({ href, icon, label, ariaLabel }, idx) => (
            <li key={idx}>
              <Link href={href} aria-label={ariaLabel}>
                <LinkIcon name={icon} />
               {label}
              </Link>
            </li>
          ))}
         
        </ul>
      </div>
      <div className='contacts__group'>
        <h3 className='contacts__group-title'>Contact me</h3>
        <form className='contacts__form' id='js--contacts-form'>
          <TextField
            id='name'
            label='Your Name:'
            placeholder='John Doe'
            type='text'
            required
          />

          <SelectField
            id='subject'
            label='Subject:'
            placeholder='A message you would like to send me...'
          >
            <option value='Hire You'>I wanna hire you</option>
            <option value='Contact You'>I wanna contact you</option>
          </SelectField>

          <TextField
            id='body'
            label='Message:'
            placeholder='A message you would like to send me...'
            as='textarea'
          />
          <Button>Send Message</Button>
        </form>
      </div>
    </Footer>
  );
};
