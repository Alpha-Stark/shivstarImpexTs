import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, email, subject, message } = data;
        try {
            // Simulate submission process (e.g., API call)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Display success toast notification
            toast.success("Form submitted successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });

            // Reset form fields after successful submission
            reset();
        } catch (error) {
            console.error("Submission error:", error);
            // Optionally handle error scenarios
        }
    };

    return (
        <>
            <div className="con-main">
                <br />
                <br />
                <br />

                <h1 className="contact-head">Contact Us</h1>
                <p className="para">If you've got any questions, please fill out the short form below, we promise to get back to you in lightning speed.</p>
                <br />
            </div>
            <div className="ContactForm">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="contactForm">
                                <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                                    {/* Row 1 of form */}
                                    <div className="row formRow">
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                name="name"
                                                {...register("name", {
                                                    required: "Please enter your name",
                                                    maxLength: {
                                                        value: 30,
                                                        message: "Please use 30 characters or less",
                                                    },
                                                })}
                                                className="form-control formInput contact-name"
                                                placeholder="Name"
                                            />
                                            <br />
                                            {errors.name && <span className="errorMessage">{errors.name.message}</span>}
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="email"
                                                name="email"
                                                {...register("email", {
                                                    required: "Please enter your email address",
                                                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                })}
                                                className="form-control formInput contact-mail"
                                                placeholder="Email address"
                                            />
                                            <br />
                                            {errors.email && <span className="errorMessage">Please enter a valid email address</span>}
                                        </div>
                                    </div>
                                    {/* Row 2 of form */}
                                    <div className="row formRow">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="subject"
                                                {...register("subject", {
                                                    required: "Please enter a subject",
                                                    maxLength: {
                                                        value: 75,
                                                        message: "Subject cannot exceed 75 characters",
                                                    },
                                                })}
                                                className="form-control formInput sub"
                                                placeholder="Title"
                                            />
                                            <br />
                                            {errors.subject && <span className="errorMessage">{errors.subject.message}</span>}
                                        </div>
                                    </div>
                                    {/* Row 3 of form */}
                                    <div className="row formRow">
                                        <div className="col">
                                            <textarea
                                                rows={3}
                                                name="message"
                                                {...register("message", {
                                                    required: "Please enter a message",
                                                })}
                                                className="form-control formInput message"
                                                placeholder="Message"
                                            />
                                            <br />
                                            {errors.message && <span className="errorMessage">Please enter a message</span>}
                                        </div>
                                    </div>

                                    <button className="submit-btn btn btn-primary" type="submit" disabled={false}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ContactForm;
