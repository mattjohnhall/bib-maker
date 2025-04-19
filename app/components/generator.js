"use client"

import { useState, Fragment } from "react"
import Link from "next/link"
import { Dialog, Transition } from '@headlessui/react'
import { motion } from "motion/react"

export default function Generator({ campaign }) {
  const [raceNumber, setRaceNumber] = useState(campaign.defaults.raceNumber)
  const [startLine, setStartLine] = useState(campaign.defaults.startLine)
  const [name, setName] = useState(campaign.defaults.name)
  const [isOpen, setIsOpen] = useState(false)

  const themes = ["blue", "green", "pink", "red", "yellow"]

  const transition = { 
    ease: [0.455, 0.03, 0.515, 0.955], 
    duration: 0.3 
  }

  let bibUrl = `${process.env.NEXT_PUBLIC_URL}/api/bib?number=${raceNumber}&start=${startLine}${name && `&name=${name}`}`
  
  return (
    <main className="flex lg:min-h-screen flex-row-reverse items-center justify-center flex-wrap lg:flex-nowrap">
      <motion.div 
        initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ ...transition, delay: 0.5 }}
        className="relative flex flex-col items-center justify-center px-4 py-8 w-full lg:min-h-screen">
        <img src={`${process.env.NEXT_PUBLIC_URL}/api/bib?number=${raceNumber}&start=${startLine}${name && `&name=${name}`}`} alt="Your bib" className="bg-white max-w-full lg:max-w-xl xl:max-w-2xl h-auto shadow-2xl" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }} transition={{ ...transition, delay: 0.5 }}
        className="flex flex-col w-full lg:w-144 lg:min-h-screen">
        <div className="flex flex-col flex-grow justify-between lg:m-3 px-6 py-9 space-y-8 h-full bg-white shadow-lg rounded-t-2xl lg:rounded-lg">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-black">London Marathon Bib Maker</h1>

              <div className="flex flex-row items-center justify-between px-4 py-3 bg-gray-100 rounded-lg">
                <div>
                  <div className="text-xs font-medium mb-1">Supporting</div>
                  <Link href={campaign.donationLink} target="_blank">
                    <img src={`${campaign.logo}?ref=bib-maker`} alt={campaign.charity} className="h-12" />
                  </Link>
                </div>

                <Link href={campaign.donationLink} target="_blank" className="inline-flex items-center justify-center space-x-2 m-1 px-3 h-10 bg-white border border-gray-300 shadow text-gray-800 font-medium rounded-lg hover:bg-gray-100">Donate</Link>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900" htmlFor="number">Race Number</label>
                <input type="text" name="number" id="number" placeholder={`e.g. ${campaign.defaults.raceNumber}`} className="w-full h-12 border-gray-300 hover:border-gray-400 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-yellow-500" onChange={e => setRaceNumber(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">Start Line</label>
                
                <div className="flex flex-row p-1 bg-white border border-gray-300 hover:border-gray-400  rounded-lg shadow">
                  {themes.map((theme, index) => (
                    <div className="flex w-full" key={theme}>
                      <input className="sr-only focus:outline-none" type="radio" name="start" id={`option-${theme}`} value={theme} onChange={e => setStartLine(e.target.value)} checked={theme == startLine} />
                      <label className={`relative flex items-center justify-center px-3 h-10 w-full rounded cursor-pointer hover:bg-gray-100`} htmlFor={`option-${theme}`}>
                        <span className="capitalize">{theme}</span>
                      </label>
                    </div>
                  ))}
                  
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900" htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="w-full h-12 border-gray-300 hover:border-gray-400  rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-yellow-500" onChange={e => setName(e.target.value)} />
              </div>
            </form>

            <a href={bibUrl} download={`bib-${raceNumber}.png`} onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center space-x-2 w-full h-12 bg-gray-900 rounded-lg shadow text-white font-medium hover:bg-gray-700">
              <span>Download Bib</span>
            </a>
          </div>

          <div className="space-y-4 text-xs">
            <p>The logos of event organizers and sponsors displayed in this generated image are for illustrative purposes only and remain the intellectual property of their respective owners</p>
            <p>Built over a couple of random evenings by <Link href="https://matthall.co" className="text-blue underline hover:no-underline" target="_blank">Matt Hall</Link>.</p>

            <Link href="https://matthall.co" className="flex h-4">
              <svg width="30" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Matt Hall</title>
                <path d="M18.65 21.1a4.7 4.7 0 0 1-7.53-5.62L20.53 2.9A4.7 4.7 0 0 1 29 5.71v12.58a4.7 4.7 0 0 1-9.22 1.3l-1.13 1.51Z" className="fill-gray-900 stroke-gray-900 dark:fill-white dark:stroke-white" fillOpacity={0.25} strokeWidth={1.5} />
                <path d="M11.35 21.1a4.7 4.7 0 0 0 7.53-5.62L9.47 2.9A4.7 4.7 0 0 0 1 5.71v12.58a4.7 4.7 0 0 0 9.22 1.3l1.12 1.51h.01Z" className="fill-white stroke-gray-900 dark:fill-gray-900 dark:stroke-white" strokeWidth={1.5} />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>

      <Transition appear={true} show={isOpen}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            enter="transition duration-150 ease-out" enterFrom="transform opacity-0" enterTo="transform opacity-100"
            leave="transition duration-150 ease-out" leaveFrom="transform opacity-100" leaveTo="transform opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
          </Transition.Child>
            
          <Transition.Child
            enter="transition duration-300 ease-out delay-150" enterFrom="transform opacity-0 translate-y-full" enterTo="transform opacity-100 translate-y-0"
            leave="transition duration-300 ease-out delay-150" leaveFrom="transform opacity-100 translate-y-0" leaveTo="transform opacity-0 translate-y-full"
            as={Fragment}
          >
            <div className="fixed inset-0 w-screen overflow-y-auto modal">
              <Dialog.Panel className="relative mx-auto my-8 p-8 lg:p-12 max-w-3xl rounded-xl overflow-hidden bg-white">
                <div className="flex flex-col items-center text-center gap-8">
                  <div className="w-1/2 lg:w-64 aspect-square bg-gray-100">
                    <img src={bibUrl} alt="Your bib" className="bg-white max-w-full h-auto border border-gray-200" />
                  </div>

                  <div className="w-full space-y-6">
                    <Dialog.Title className="text-2xl lg:text-3xl text-gray-900 font-black">Your bib is now downloading</Dialog.Title>

                    <div className="space-y-4 lg:px-16">
                      <p>If you&apos;ve found this little tool helpful, would you consider making a small donation to {campaign.charity}?</p>
                      <p>{campaign.message}</p>
                      <p>Best of luck on race day!</p>
                    </div>

                    <div>
                      <Link href={campaign.donationLink} target="_blank" className="inline-flex items-center justify-center space-x-2 m-1 px-4 h-12 bg-gray-900 shadow text-white font-medium rounded-lg hover:bg-gray-700">Sure, I would love to donate</Link>
                      <button onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center space-x-2 m-1 px-4 h-12 bg-white border border-gray-300 shadow text-gray-800 font-medium rounded-lg hover:bg-gray-100">No, thank you</button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </main>
  );
}
