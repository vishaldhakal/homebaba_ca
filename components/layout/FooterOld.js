import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <>
      <footer className="footerr bg-white">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 py-4">
            <div className="col-md-3 my-3">
              <a className="navbar-brand bottomlogo" href="/">
                homebaba
                <span>
                  <img
                    src="/canadaleaf.svg"
                    alt="canada mapel leaf"
                    className="img-fluid leaf-img2 ms-1"
                  />
                </span>
              </a>
              <p className="bottex mt-3 justifyy">
                Homebaba is the online Database for new Pre construction
                detached, semi-detached, townhomes and condos in Canada.
                Homebaba does not represent any builder. The content of the
                pages of this website is for your general information, reference
                only. We are not liable for the use or misuse of the site's
                information. Prices, sizes, specifications, and promotions of
                the condos are subject to change by the builder without notice.
                E&OE
              </p>
              <div className="my-3">
                <h5 className="text-dark fw-bold">Company</h5>
                <div className="list">
                  <a href="#" className="mybot">
                    Work with us
                  </a>
                  <a href="#" className="mybot">
                    Blogs
                  </a>
                  <a href="#" className="mybot">
                    Contact us
                  </a>
                  <Link href="/privacy" className="mybot">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <h5 className="text-dark fw-bold text-start ps-0">Popular Cities</h5>
              <div className="footer-links">
                <div className="row row-cols-1">
                  {[
                    "Ajax",
                    "Aurora",
                    "Barrie",
                    "Brampton",
                    "Burlington",
                    "Cambridge",
                    "Calgary",
                    "Georgetown",
                    "Grimsby",
                    "Hamilton",
                    "Innisfil",
                    "Kitchener",
                    "Markham",
                    "Milton",
                    "Mississauga",
                    "Niagara",
                    "Oakville",
                    "Oshawa",
                    "Ottawa",
                    "Thorold",
                    "Toronto",
                    "Vaughan",
                    "Waterloo",
                  ]
                    .sort()
                    .map((city) => (
                      <Link
                        key={city}
                        href={`/${city.toLowerCase()}`}
                        className="mybot city-link"
                      >
                        Pre construction homes in {city}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <h5 className="text-dark fw-bold text-start ps-0">Pre construction condos</h5>
              <div className="footer-links">
                <div className="row row-cols-1">
                  {[
                    "Ajax",
                    "Aurora",
                    "Barrie",
                    "Brampton",
                    "Burlington",
                    "Cambridge",
                    "Calgary",
                    "Georgetown",
                    "Grimsby",
                    "Hamilton",
                    "Innisfil",
                    "Kitchener",
                    "Markham",
                    "Milton",
                    "Mississauga",
                    "Niagara",
                    "Oakville",
                    "Oshawa",
                    "Ottawa",
                    "Thorold",
                    "Toronto",
                    "Vaughan",
                    "Waterloo",
                  ]
                    .sort()
                    .map((city) => (
                      <Link
                        key={city}
                        href={`/${city.toLowerCase()}/condos`}
                        className="mybot city-link"
                      >
                        Pre construction condos in {city}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <h5 className="text-dark fw-bold text-start ps-0">Pre construction Townhomes</h5>
              <div className="footer-links">
                <div className="row row-cols-1">
                  {[
                    "Ajax",
                    "Aurora",
                    "Barrie",
                    "Brampton",
                    "Burlington",
                    "Cambridge",
                    "Calgary",
                    "Georgetown",
                    "Grimsby",
                    "Hamilton",
                    "Innisfil",
                    "Kitchener",
                    "Markham",
                    "Milton",
                    "Mississauga",
                    "Niagara",
                    "Oakville",
                    "Oshawa",
                    "Ottawa",
                    "Thorold",
                    "Toronto",
                    "Vaughan",
                    "Waterloo",
                  ]
                    .sort()
                    .map((city) => (
                      <Link
                        key={city}
                        href={`/${city.toLowerCase()}/pre-construction/townhomes`}
                        className="mybot city-link"
                      >
                        Pre construction townhomes in {city}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-3 pt-5">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <div className="row row-cols-6">
                <div className="col">
                  <a
                    href="https://www.facebook.com/thehomebaba/"
                    className=" text-center"
                    target="_blank"
                  >
                    <img
                      src="/facebook.svg"
                      alt="Facebook Icon which links to homebaba facebook page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg"
                    className=" text-center"
                    target="_blank"
                  >
                    <img
                      src="/youtube.png"
                      alt="Youtube Icon which links to homebaba facebook page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.instagram.com/homebabaa/"
                    className=" text-center"
                    target="_blank"
                  >
                    <img
                      src="/instagram.svg"
                      alt="Instagram Icon which links to homebaba instagram page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.linkedin.com/company/homebaba/about/?viewAsMember=true"
                    className=" text-center"
                  >
                    <img
                      src="/linkedin.svg"
                      alt="Linked Icon which links to homebaba linkedin page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://twitter.com/homebabaa"
                    className=" text-center"
                  >
                    <img
                      src="/twitter.png"
                      alt="Twitter Icon which links to homebaba twitter page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.tiktok.com/@homebabaa"
                    className=" text-center"
                  >
                    <img
                      src="/tiktok.png"
                      alt="Tiktok Icon which links to homebaba twitter page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row text-center mt-3 px-3 pb-5">
            <p>&copy;2025 Homebaba</p>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        .city-link {
          font-size: 0.9rem !important;
          line-height: 1.7 !important;
          display: block;
          padding: 1px 0;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.2px;
          text-align: left;
        }
        .footer-links {
          padding-left: 0;
        }
        .footer-links .row {
          margin-left: 0;
          margin-right: 0;
        }
        @media (max-width: 768px) {
          .city-link {
            font-size: 0.8rem !important;
            text-align: left;
            line-height: 1.6 !important;
            padding: 3px 0;
            white-space: normal;
            letter-spacing: normal;
          }
          h5.text-start {
            text-align: left !important;
            padding-left: 0 !important;
          }
          .footer-links {
            text-align: left;
            padding-left: 0;
          }
          .col-md-3 {
            padding-left: 25px !important;
            padding-right: 25px !important;
          }
          .footer-links .row {
            padding-left: 0;
            margin-left: 0;
          }
        }
        .row {
          margin-right: -12px;
          margin-left: -12px;
        }
        .col-md-3 {
          padding-right: 12px;
          padding-left: 12px;
        }
      `}</style>
    </>
  );
}
