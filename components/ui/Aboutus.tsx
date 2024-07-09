import Image from 'next/image'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { GridBackground } from './herobg'

const Aboutus = () => {
  const cardData = [
    {
      title: 'Adithya Rao K',
      description: 'A passionate web developer',
      imageUrl: '/Adithya.jpg',
      linkedinLink: 'https://www.linkedin.com/in/adithya-rao-k/',
      githubLink: 'https://github.com/Adithya11811',
    },
    {
      title: 'Arshad Sheikh',
      description: 'Full stack developer',
      imageUrl: '/arshad.jpg',
      linkedinLink: 'https://www.linkedin.com/in/arshad-sheikh-b5a28027',
      githubLink: 'https://github.com/Arshad59',
    },
  ]

  return (
    <div
      id="about"
      className="h-screen relative -top-14 flex flex-col justify-top items-center"
    >
      <div className="lg:h-[5%]  mb-10 h-5 lg:text-6xl text-2xl text-pretty font-bold tracking-wide">
        Meet the Devs
      </div>
      <div className="lg:h-[95%] h-screen flex lg:flex-row flex-col justify-center items-center max-lg:space-y-10 ">
        {cardData.map((card, index) => (
          <CardContainer key={index} className="">
            <CardBody className="hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-green-500/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-4 lg:p-6 border-2 m-2 ">
              <CardItem
                translateZ="50"
                className="lg:text-xl text-md font-bold  text-green-500"
              >
                {card.title}
              </CardItem>

              <CardItem translateZ="20" className="w-full mt-2 lg:mt-4">
                <Image
                  src={card.imageUrl}
                  height="1000"
                  width="1000"
                  className="h-52 md:h-80 w-full object-cover rounded-xl shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className=" text-lg text-center w-full mt-2 text-green-500/40"
              >
                {card.description}
              </CardItem>
              <div className="flex justify-center gap-6 items-center">
                <CardItem
                  as="p"
                  translateZ="60"
                  className=" text-md flex justify-center items-center text-center  mt-2 rounded-full text-green-500/40"
                >
                  <Link href={card.linkedinLink}>
                    <FaLinkedinIn size={25} />
                  </Link>
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className=" text-md flex justify-center items-center text-center  mt-2 rounded-full text-green-500/40"
                >
                  <Link href={card.githubLink}>
                    <FaGithub size={25} />
                  </Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}
export default Aboutus

