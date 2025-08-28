import './Footer.css';


const Footer = () => {
const navLinks = [
{ title: 'Home', url: '/' },
{ title: 'Chi Siamo', url: '/chiSiamo' },
{ title: 'Questionario', url: '/questionario' },
{ title: 'Privacy Policy', url: '/privacy' }
];


return (
<footer className='footer bg-dark text-white d-flex justify-content-around align-items-center'>
{navLinks.map((link, index) => (
<a key={index} href={link.url}>{link.title}</a>
))}
</footer>
);
};


export default Footer;