import Founder from "../assets/img/Rafi2.jpg"
import Company from '../assets/img/logo.jpg'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <article className="pb-20 pt-4 text-center">
        <h2 className="font-bold text-5xl my-1">About Us</h2>
        <p>Best interior Solution</p>
      </article>

      <section className="flex gap-10 justify-center items-center">
      <div className="w-[30rem]">
        <img className="w-full h-full rounded-md border object-cover" src={Founder} alt="" />
       </div>
       <article className="w-2/4">
        <h2 className="font-bold text-4xl my-2">About Founder</h2>
        <p className="text-md">Introducing Munim Shariar, the visionary force behind PLAN Interior Solution, a beacon of creativity and innovation in the realm of interior design. With an unwavering passion for aesthetics and functionality, Munim Shariar has carved out a reputation for transforming spaces into captivating and harmonious environments.As the founder and principal designer of PLAN Interior Solution, Munim Shariar brings to the table a unique blend of expertise, experience, and artistic flair. With a keen eye for detail and a commitment to personalized service, Munim Shariar has garnered acclaim for delivering bespoke design solutions that exceed expectations.</p>
       </article>
      </section>

      <section className="flex gap-4 justify-center mt-40 mb-10">
       <article className="w-2/4">
        <h2 className="font-bold text-4xl my-3">About Company</h2>
        <p className="text-md">With a diverse portfolio spanning residential, commercial, and hospitality projects, Munim Shariar and their team at PLAN Interior Solution are adept at translating clients' visions into reality while infusing each project with a distinct sense of style and sophistication. Driven by a relentless pursuit of excellence and a deep understanding of design principles, Munim Shariar remains at the forefront of the industry, continually pushing boundaries and setting new standards for innovation and creativity in interior design. In every endeavor, Munim Shariar and PLAN Interior Solution strive to create spaces that not only inspire and delight but also reflect the unique personality and lifestyle of their clients. With an unwavering commitment to quality and a passion for perfection, Munim Shariar continues to elevate the art of interior design, one exquisite space at a time.</p>
       </article>
       <div className="h-80 ">
        <img className="w-full h-full rounded-md border" src={Company} alt="" />
       </div>
      </section>
    </div>
  )
}

export default About
