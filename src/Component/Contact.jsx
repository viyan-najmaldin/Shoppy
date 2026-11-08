import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import Email from '../assets/Mention-rafiki.png'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Send data to EmailJS or your backend here

    alert("Your message has been sent successfully!");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="sm:text-4xl text-2xl font-bold">Contact Me</h1>

          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Have a question, project idea, or just want to say hello?
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
           <img src={Email} alt="image contact email" className="hidden lg:block w-80 absolute right-2 top-30" />
        <div className="flex w-full sm:flex-row flex-col gap-20">

          {/* Contact Information */}
          <div className="p-2 sm:order-0 order-1">

            <h2 className="text-2xl font-semibold mb-8 ">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tigris-700/10 rounded-full flex items-center justify-center text-tigris-700">
                  <FaEnvelope />
                </div>

                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-slate-500">
                    vnajmadin@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tigris-700/10 rounded-full flex items-center justify-center text-tigris-700">
                  <FaPhoneAlt />
                </div>

                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-slate-500">
                    +964 751 181 3705
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tigris-700/10 rounded-full flex items-center justify-center text-tigris-700">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-slate-500">
                    Erbil, Kurdistan Region, Iraq
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tigris-700/10 rounded-full flex items-center justify-center text-tigris-700">
                  <FaClock />
                </div>

                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-slate-500">
                    Monday - Friday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-300 mt-8 pt-8">
              <h3 className="font-semibold mb-4">Follow Me</h3>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-slate-100 text-tigris-800 hover:bg-tigris-700 hover:text-white transition flex items-center justify-center"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full text-tigris-800 bg-slate-100 hover:bg-tigris-700 hover:text-white transition flex items-center justify-center"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl w-full shadow-sm border border-slate-300 sm:p-8 p-5">

            <h2 className="text-2xl font-semibold mb-8">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

               <div className="grid grid-cols-2 gap-5">
              <div>
                <label for='fullname' className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  id="fullname"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-tigris-500"
                />
              </div>

              <div>
                <label for='email' className="block mb-2 font-medium">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-tigris-500"
                />
              </div>
</div>
              <div>
                <label for='subject' className="block mb-2 font-medium">
                  Subject
                </label>

                <input
                  id='subject'
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-tigris-500"
                />
              </div>
                   
              <div>
                <label for='message' className="block mb-2 font-medium">
                  Message
                </label>

                <textarea
                 id="message"
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 resize-none outline-none focus:ring-1 focus:ring-tigris-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-tigris-800 text-white rounded-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}