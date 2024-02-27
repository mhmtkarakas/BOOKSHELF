import React from "react";
             // fonksiyonlarimizi prop olarak burada karsiliyoruz 
const CustomModal = ({ title, mesaj, onCancel=()=>{}, onConfirm=()=>{} }) => { 
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:1000
      }}
    >
      <div
        style={{
          width: "60%",
          padding: "20px",
          background: "#fff",
          borderRadius: "5px",
        }}
      >
        <h1 className="text-center ">{title}</h1>
        <p className="text-center fs-4">{mesaj}</p>
        <div className="text-center">
          <div className="btn-group " role="group" aria-label="Basic example">
            {/* prop olarak gelen fonksiyonlar onClick oldugunda calisacak sekilde kodumuzu yaziyoruz */}
            <button onClick={onConfirm} type="button" className="btn btn-lg btn-danger mx-3">
              --Sil--
            </button>
            <button onClick={onCancel} type="button" className="btn btn-lg btn-primary">
              Vazgec
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
