export const services = {
  consultation: {
    name: 'Consultation',
    price: 1500, // in INR (paise will be calculated)
    duration: '60 minutes',
  },
  therapy: {
    name: 'Therapy Session',
    price: 3000,
    duration: '90 minutes',
  },
  coaching: {
    name: 'Coaching',
    price: 2500,
    duration: '60 minutes',
  },
  workshop: {
    name: 'Workshop',
    price: 5000,
    duration: '120 minutes',
  },
};

export const getServicePrice = (service: string): number => {
  return services[service as keyof typeof services]?.price || 2000;
};

