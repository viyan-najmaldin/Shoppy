
import React, { useState } from "react";
import { FiMail, FiArrowRight, FiCheck } from "react-icons/fi";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-16">
      <div
        className="relative overflow-hidden rounded-3xl
                   bg-tigris-800 px-6 py-12
                   sm:px-10 lg:px-16
                   text-white"
      >

        {/* Decorative circles */}
        <div
          className="absolute -top-24 -right-24
                     w-64 h-64 rounded-full
                     bg-white/5"
        />

        <div
          className="absolute -bottom-32 -left-20
                     w-72 h-72 rounded-full
                     bg-white/5"
        />

        {/* Content */}
        <div className="relative z-10 flex sm:flex-row flex-col justify-between  text-center" >
         <div >

        
 
          {/* Heading */}
          <h2
            className="mt-2
                       text-3xl sm:text-4xl lg:text-5xl
                       font-bold"
          >
            Stay in the Loop
          </h2>

          {/* Description */}
          <p
            className="mt-4
                       text-sm sm:text-base
                       text-white/65
                       max-w-xl mx-auto
                       leading-relaxed"
          >
            Subscribe to our newsletter and be the first to know
            about new products, exclusive offers, and special deals.
          </p>
 </div>
 <div className="mr-10">

          {/* Form */}
          {!subscribed ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8
                         flex flex-col sm:flex-row
                         gap-3
                         max-w-xl mx-auto"
            >

              {/* Email */}
              <div
                className="flex-1
                           flex items-center
                           bg-white
                           rounded-full
                           px-5
                           h-12"
              >

                <FiMail
                  className="text-gray-400 mr-3 shrink-0"
                  size={18}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-70
                             outline-none
                             bg-transparent
                             text-gray-900
                             placeholder:text-gray-400
                             text-sm"
                />

              </div>


              {/* Subscribe button */}
              <button
                type="submit"
                className="h-12
                           px-7
                           rounded-full
                           bg-white
                           text-gray-900
                           font-semibold
                           text-sm
                           flex items-center
                           justify-center
                           gap-2
                           hover:bg-gray-200
                           transition
                           duration-300
                           whitespace-nowrap"
              >
                Subscribe
                <FiArrowRight size={17} />
              </button>

            </form>
          ) : (

            /* Success message */
            <div
              className="mt-8
                         flex items-center
                         justify-center
                         gap-2
                         text-sm
                         font-medium"
            >

              <div
                className="w-8 h-8
                           rounded-full
                           bg-white
                           text-gray-900
                           flex items-center
                           justify-center"
              >
                <FiCheck size={17} />
              </div>

              <span>
                You're subscribed! Thanks for joining us.
              </span>

            </div>
          )}


      

</div>
        </div>

      </div>
    </section>
  );
};

export default Subscribe;
