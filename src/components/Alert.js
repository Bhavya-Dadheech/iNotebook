import React from "react";

export default function Alert({ alert }) {
  return (
    <div>
      <div className={`alert alert-${alert?.type} alert-dismissible fade ${alert?.show}`} role="alert">
        <strong>{alert?.msg}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  );
}
