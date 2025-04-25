import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";

// Social media link type
interface SocialMediaLink {
  href: string;
  iconClass: string;
}

// Footer section type
interface FooterSection {
  title: string;
  links: string[];
}

// Social Media Icons
const socialMediaLinks: SocialMediaLink[] = [
  { href: "#!", iconClass: "fab fa-facebook-f" },
  { href: "#!", iconClass: "fab fa-twitter" },
  { href: "#!", iconClass: "fab fa-google" },
  { href: "#!", iconClass: "fab fa-instagram" },
  { href: "#!", iconClass: "fab fa-linkedin-in" },
  { href: "#!", iconClass: "fab fa-github" },
];

// Footer Data Sections
const footerData: FooterSection[] = [
  {
    title: "ADVERTISERS",
    links: [
      "Advertise",
      "Add a Property",
      "Digital Feeds Program",
      "Customer Portal",
      "Community Voice",
    ],
  },
  {
    title: "TOP RENTAL MARKETS",
    links: [
      "New York City",
      "Boston MA",
      "Philadelphia PA",
      "Brooklyn NY",
      "Miami FL",
      "Atlanta GA",
      "Los Angeles",
      "Seattle WA",
      "Austin TX",
      "Houston TX",
    ],
  },
  {
    title: "RENTAL MANAGER",
    links: [
      "Apartments.com Rental Manager",
      "List Your Property For Rent",
      "Screen Applicants",
      "Create Rental Leases",
      "Collect Rent Online",
      "Rent Comps",
      "Rental Manager Resources",
      "Rental Property Calculator",
    ],
  },
  {
    title: "ABOUT US",
    links: [
      "About Us",
      "Careers",
      "Contact Us",
      "Legal Notices",
      "Privacy Notice",
      "CA: Do Not Sell My Personal Info",
      "Equal Housing",
      "Avoid Scams",
      "Accessibility",
      "Rent Calculator",
      "Cost of Living",
      "Rentervese",
      "Sitemap",
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          {/* Logo and Info */}
          <Col lg={4} md={4} sm={12}>
            <div className="left d-flex align-items-center">
              <img src="images/logo.png" alt="logo" height={90} width={90} />
              <h2 style={{ letterSpacing: ".4rem" }} className="ms-3">
                TheHomless.org
              </h2>
            </div>

            <p className="text-end mt-3">© 2025 CoStar Group, Inc.</p>

            {/* Social Media Icons */}
            <div className="social-icons text-end">
              {socialMediaLinks.map((item, index) => (
                <a
                  key={index}
                  className="btn text-white bg-dark btn-floating me-1"
                  href={item.href}
                  role="button"
                >
                  <i className={item.iconClass}></i>
                </a>
              ))}
            </div>
          </Col>

          {/* Footer Links */}
          {footerData.map((section, index) => (
            <Col key={index} lg={2} md={4} sm={6} xs={12} className="mb-4 text-center">
              <h6 className="mb-3">{section.title}</h6>
              <ul className="list-unstyled">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#!"
                      className="text-decoration-none d-block mb-2"
                      style={{ color: "gray", fontSize: ".8rem" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
