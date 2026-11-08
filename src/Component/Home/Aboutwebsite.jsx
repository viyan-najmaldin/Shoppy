import {
  FaTruck,
  FaRotateLeft,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa6";
import { formatPrice, SHIPPING_FEE } from "../../utils/format";

const promises = [
  { icon: FaTruck, title: "Delivery across Iraq", text: `${formatPrice(SHIPPING_FEE)} to any city` },
  { icon: FaMoneyBillWave, title: "Pay when it arrives", text: "Cash to the courier at your door" },
  { icon: FaRotateLeft, title: "Easy returns", text: "30-day return policy" },
  { icon: FaHeadset, title: "24/7 support", text: "Message us any time" },
];

const Aboutwebsite = () => {
  return (
    <section className="mx-4 sm:mx-6 lg:mx-8 my-6 rounded-[1.75rem] bg-tigris-800 text-white px-5 py-7 sm:px-8 sm:py-9">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
        {promises.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Icon className="text-lagoon text-xl sm:text-2xl shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold leading-tight">{title}</h3>
              <p className="text-white/65 text-xs sm:text-sm">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Aboutwebsite
