'use client'

import React from 'react';
import Image from 'next/image';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Image for tablet and below */}
      <div className="lg:hidden w-full relative" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
        <Image
          src="/ema-thankyou.png"
          alt="Thank you"
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-grow lg:w-1/2 flex items-center justify-center p-8 md:pr-24">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Thank You!</h1>
          <p className="text-lg text-center">
            Your referral has been received. Someone from the EMA team will follow up in 24-48 hours.
          </p>
        </div>
      </div>
      
      {/* Image for larger screens */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/ema-thankyou.png"
          alt="Thank you"
          layout="fill"
          objectFit="cover"
          className="h-full"
        />
      </div>
    </div>
  );
};

export default SuccessPage;