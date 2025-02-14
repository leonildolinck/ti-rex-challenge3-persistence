import React from "react";

const NotFoundSection: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-[600px]">
      <div className="col-md-12 text-center">
        <h1 className="lg:text-9xl md:text-4xl sm:text-2xl">404</h1>
        <h2 className="lg:text-4xl md:text-2xl sm:text-1xl">Page Not Found</h2>
        <p className="lg:text-2xl md:text-1xl sm:text-1xl">Sorry, the page you are looking for does not exist.</p>
      </div>
    </section>
  );
};

export default NotFoundSection;
