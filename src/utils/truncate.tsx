export const truncateText = (url: string, maxLength: number, preserveLastFour: boolean) => {
  if (url.length <= maxLength) {
    return url;
  }
  if (preserveLastFour) {
    const start = url.slice(0, 10);
    const end = url.slice(-4); 
    return `${start}...${end}`;
  } else {
    const start = url.slice(0, maxLength - 4);
    return `${start}...`;
  }
};

export const maskSensitiveData = (input: string, type: 'email' | 'phone'): string => {
  if (type === 'email') {
    const [localPart, domain] = input.split("@");
    if (localPart.length <= 2) {
      return input;
    }
    const maskedLocalPart = localPart.substring(0, 2) + "***";
    return `${maskedLocalPart}@${domain}`;
  } else if (type === 'phone') {
    if (input.length <= 5) {
      return input;
    }
    const visiblePart = input.substring(0, 2);
    const maskedPart = '*'.repeat(input.length - 5);
    const lastPart = input.substring(input.length - 3); 
    return `${visiblePart}${maskedPart}${lastPart}`;
  }
  
  throw new Error("Invalid type. Use 'email' or 'phone'.");
};