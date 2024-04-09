"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import Link from "next/link"

export default function Home() {
  const [raceNumber, setRaceNumber] = useState("58336")
  const [startLine, setStartLine] = useState("blue")
  const [isOpen, setIsOpen] = useState(false)
  const themes = ["blue", "green", "red", "yellow"]
  
  return (
    <main className="flex lg:min-h-screen flex-row-reverse items-center justify-center flex-wrap lg:flex-nowrap">
      <div className="relative flex flex-col items-center justify-center p-8 w-full lg:min-h-screen bg-gray-100 rounded-2xl border-8 border-white">
        <img src={`${process.env.NEXT_PUBLIC_URL}/api/bib?number=${raceNumber}&start=${startLine}`} alt="Your bib" className="bg-white max-w-full lg:max-w-xl xl:max-w-2xl h-auto shadow-2xl" />
      </div>

      <div className="flex flex-col justify-between p-8 space-y-8 w-full lg:w-128 lg:min-h-screen">
        <div className="space-y-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 22" className="hidden lg:flex h-6">
            <title>Matt Hall</title>
            <path 
              fill={"currentColor"} fillOpacity={0.5} d="M10.35 20.1a4.7 4.7 0 0 0 7.53-5.62L8.47 1.9A4.7 4.7 0 0 0 0 4.71v12.58a4.7 4.7 0 0 0 9.22 1.3l1.12 1.51Z" />
            <path 
              fill={"currentColor"} fillOpacity={0.5} d="M17.65 20.1a4.7 4.7 0 0 1-7.53-5.62L19.53 1.9A4.7 4.7 0 0 1 28 4.71v12.58a4.7 4.7 0 0 1-9.22 1.3l-1.13 1.51Z" />
          </svg>

          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl">London Marathon Bib Maker</h1>
            <p className="text-base lg:text-lg text-gray-700">Enter your number and start line to create an avatar out of your race bib</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">Race Number</label>
              <input type="text" name="number" className="w-full h-12 text-xl border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500" onChange={e => setRaceNumber(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">Start Line</label>
              
              <div className="flex flex-col lg:flex-row space-between gap-2">
                {themes.map((theme) => (
                  <div className="block w-full lg:inline-flex lg:w-auto" key={theme}>
                    <input className="sr-only  focus:outline-none" type="radio" name="start" id={`option-${theme}`} value={theme} onChange={e => setStartLine(e.target.value)} />
                    <label className="inline-flex items-center justify-center px-4 h-12 w-full lg:w-auto border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100" for={`option-${theme}`}>
                      <span class="capitalize">{theme}</span>
                    </label>
                  </div>
                ))}
                
              </div>
            </div>
          </form>

          <a href={`/api/bib?number=${raceNumber}&start=${startLine}`} download={`bib-${raceNumber}.png`} onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center space-x-2 w-full h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            <span>Download Bib</span>
          </a>
        </div>

        <div className="space-y-4 text-xs">
          <p>The logos of event organizers and sponsors displayed in this generated image are for illustrative purposes only and remain the intellectual property of their respective owners</p>
          <p>Built one random evening by <Link href="https://matthall.co" className="text-blue underline hover:no-underline" target="_blank">Matt Hall</Link>.</p>
        </div>
      </div>

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
              <Dialog.Panel className="relative mx-auto my-8 p-12 max-w-3xl rounded-xl overflow-hidden bg-white">
                <div className="flex flex-col items-center text-center gap-8">
                  <div className="w-1/2 lg:w-64 aspect-square bg-gray-100">
                    <img src={`${process.env.NEXT_PUBLIC_URL}/api/bib?number=${raceNumber}&start=${startLine}`} alt="Your bib" className="bg-white max-w-full h-auto border border-gray-200" />
                  </div>

                  <div className="w-full space-y-6">
                    <Dialog.Title className="text-2xl lg:text-3xl text-gray-900">Your bib is now downloading</Dialog.Title>

                    <div className="space-y-4">
                      <p>If you&apos;ve found this little tool helpful, would you consider making a small donation to the Royal Marsden Cancer Charity? Every contribution, no matter how big or small, goes a long way in supporting their incredible work in the fight against cancer.</p>
                      <p>Best of luck on race day!</p>
                    </div>

                    <div className="space-x-2">
                      <Link href="https://2024tcslondonmarathon.enthuse.com/pf/matt-hall" target="_blank" className="inline-flex items-center justify-center space-x-2 px-4 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800">Sure, I would love to donate</Link>
                      <button onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center space-x-2 px-4 h-12 bg-white border border-gray-400 text-gray-800 rounded-lg hover:bg-gray-100">No, thank you</button>
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
