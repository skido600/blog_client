import { siteMetadata } from "./Datas/sitemap";

function Me() {
  return (
    <div className="m-2 sm:m-10">
      <a
        href={siteMetadata.FaWhatsapp}
        target="_blank"
        rel="noopener noreferrer">
        <p className=" text-sm">
          Have a project in mind? Reach out to me 📞 from{" "}
          <span className="underline">here</span> and let's make it happen.
        </p>
      </a>
    </div>
  );
}

export default Me;
