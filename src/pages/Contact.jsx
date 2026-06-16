import { IconGrid } from '../components/ui/IconGrid.jsx';
import {
  GithubIcon,
  LinkedinIcon,
  GmailIcon,
  OutlookIcon,
} from '../components/ui/BrandIcons.jsx';
import { cv } from '../data/cv.js';
import './Contact.css';

const socials = [
  { id: 'github', name: 'GitHub', href: cv.links.github, icon: <GithubIcon /> },
  { id: 'linkedin', name: 'LinkedIn', href: cv.links.linkedin, icon: <LinkedinIcon /> },
  {
    id: 'outlook',
    name: 'Outlook',
    href: `https://outlook.office.com/mail/deeplink/compose?to=${cv.email}`,
    icon: <OutlookIcon />,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${cv.email}`,
    icon: <GmailIcon />,
  },
];

export default function Contact() {
  return (
    <section className="contact-page">
      <a className="contact-cta" href={`mailto:${cv.email}`}>
        Contact me
      </a>
      <IconGrid items={socials} />
    </section>
  );
}
