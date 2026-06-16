import { IconGrid } from '../components/ui/IconGrid.jsx';
import {
  GithubIcon,
  LinkedinIcon,
  GmailIcon,
  OutlookIcon,
} from '../components/ui/BrandIcons.jsx';
import './Contact.css';

const GMAIL = 'rabendaoskar@gmail.com';
const OUTLOOK = 'o.a.rabenda@student.tue.nl';

const socials = [
  { id: 'github', name: 'GitHub', href: 'https://github.com/OskarRabenda', icon: <GithubIcon /> },
  // LinkedIn intentionally non-functional for now (no href).
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedinIcon /> },
  {
    id: 'outlook',
    name: 'Outlook',
    href: `https://outlook.office.com/mail/deeplink/compose?to=${OUTLOOK}`,
    icon: <OutlookIcon />,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL}`,
    icon: <GmailIcon />,
  },
];

export default function Contact() {
  return (
    <section className="contact-page">
      <h1 className="contact-title">Contact Me</h1>
      <IconGrid items={socials} />
    </section>
  );
}
