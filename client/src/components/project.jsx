import {Link} from 'react-router-dom'
const Project = ({project}) => {
  
  return (
    <Link to={`/portfolio/${project?.slug}`}>
    <div  className="bg-white p-3 shadow-sm border  rounded-md overflow-hidden">
      <div className="">
        <img className="rounded h-64" src={project?.imageUrls[0]} alt="" />
        <div className="">
          <p className=" text-center mt-3 font-semibold capitalize">{project?.title}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Project
