// import React from "react";
// import { Footer, Navbar } from "../components";
// const ContactPage = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Contact Us</h1>
//         <hr />
//         <div class="row my-4 h-100">
//           <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//             <form>
//               <div class="form my-3">
//                 <label for="Name">Name</label>
//                 <input
//                   type="email"
//                   class="form-control"
//                   id="Name"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div class="form my-3">
//                 <label for="Email">Email</label>
//                 <input
//                   type="email"
//                   class="form-control"
//                   id="Email"
//                   placeholder="name@example.com"
//                 />
//               </div>
//               <div class="form  my-3">
//                 <label for="Password">Message</label>
//                 <textarea
//                   rows={5}
//                   class="form-control"
//                   id="Password"
//                   placeholder="Enter your message"
//                 />
//               </div>
//               <div className="text-center">
//                 <button
//                   class="my-2 px-4 mx-auto btn btn-dark"
//                   type="submit"
//                   disabled
//                 >
//                   Send
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ContactPage;



import React, { useState } from "react";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // State for form submission and modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      // Replace with your actual Web3Forms access key
      // const accessKey = "807d52c1-9903-4888-b50f-a93edd12db5b";
      const accessKey = "18b1bdbd-84aa-47fc-aafc-1610ed9b234c";
      
      const formSubmissionData = new FormData();
      formSubmissionData.append("access_key", accessKey);
      formSubmissionData.append("name", formData.name);
      formSubmissionData.append("email", formData.email);
      formSubmissionData.append("message", formData.message);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formSubmissionData
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        // Show success modal
        setShowModal(true);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {formError && (
              <div className="alert alert-danger" role="alert">
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message Sent!</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Thank you for your message. We'll get back to you soon!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
          {/* <div className="modal-backdrop fade show"></div> */}
        </div>
      )}

      <Footer />
    </>
  );
};

export default ContactPage;