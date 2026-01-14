export const services = {
  consultation: {
    name: "Indivdual Session",
    price: 2000, // in INR (paise will be calculated)
    duration: "60 minutes",
  },
  therapy: {
    name: "Environmental Session",
    price: 2000,
    duration: "60 minutes",
  },
  coaching: {
    name: "Customisable Session",
    price: 2000,
    duration: "60 minutes",
  },
  workshop: {
    name: "Group Session",
    price: 2000,
    duration: "60 minutes",
  },
};

export const getServicePrice = (service: string): number => {
  return services[service as keyof typeof services]?.price || 2000;
};
