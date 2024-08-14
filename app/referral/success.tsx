'use client'

import Image from 'next/image';

export default function SuccessPage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto p-8">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg">
          Your referral has been received. Someone from the EMA team will follow up in 24-48 hours.
        </p>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <Image
          src="/ema-thankyou.png"
          alt="Thank you"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}