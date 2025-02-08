import React from "react";

const NotFoundSection: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-[600px]">
      <div className="col-md-12 text-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-4xl">Page Not Found</h2>
        <p className="text-2xl">Sorry, the page you are looking for does not exist.</p>
      </div>
    </section>
  );
};

export default NotFoundSection;
