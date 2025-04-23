
export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  pesticides: {
    name: string;
    description: string;
    usage: string;
  }[];
}

export const diseases: Disease[] = [
  {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    description: "A fungal disease that affects a wide range of plants. Powdery mildew diseases are caused by many different species of fungi.",
    symptoms: [
      "White powdery spots on the leaves and stems",
      "Distorted or stunted growth",
      "Yellowing leaves that may die prematurely",
      "Decreased plant vigor"
    ],
    pesticides: [
      {
        name: "Neem Oil",
        description: "A natural fungicide that's effective against powdery mildew.",
        usage: "Mix 2-4 tablespoons per gallon of water and spray on affected plants, covering all surfaces."
      },
      {
        name: "Potassium Bicarbonate",
        description: "An eco-friendly fungicide that can both prevent and treat powdery mildew.",
        usage: "Mix 1 tablespoon per gallon of water with a small amount of mild soap and spray thoroughly."
      }
    ]
  },
  {
    id: "leaf-spot",
    name: "Leaf Spot",
    description: "A common disease caused by various fungi and bacteria that results in spots on leaves.",
    symptoms: [
      "Dark, water-soaked spots on leaves",
      "Spots may have yellow halos",
      "Severely infected leaves may turn yellow and fall off",
      "Progressive spotting that can merge into larger blotches"
    ],
    pesticides: [
      {
        name: "Copper-Based Fungicide",
        description: "Effective against many leaf spot diseases.",
        usage: "Apply as directed on the product label, typically every 7-10 days during wet weather."
      },
      {
        name: "Chlorothalonil",
        description: "A broad-spectrum fungicide that prevents fungal spores from germinating.",
        usage: "Apply every 7-14 days as a preventative measure or at first sign of disease."
      }
    ]
  },
  {
    id: "aphids",
    name: "Aphid Infestation",
    description: "Tiny sap-sucking insects that cause leaf curling and can transmit plant viruses.",
    symptoms: [
      "Curled, distorted, or yellowing leaves",
      "Sticky honeydew residue on leaves or ground",
      "Clusters of small green, black, or white insects on stems or leaf undersides",
      "Stunted plant growth"
    ],
    pesticides: [
      {
        name: "Insecticidal Soap",
        description: "A gentle solution that kills soft-bodied insects on contact.",
        usage: "Spray directly on aphids, ensuring coverage of leaf undersides. Reapply every 7-10 days as needed."
      },
      {
        name: "Pyrethrin",
        description: "A natural insecticide derived from chrysanthemum flowers.",
        usage: "Apply as directed, typically in the early morning or evening to minimize harm to beneficial insects."
      }
    ]
  },
  {
    id: "rust",
    name: "Rust Disease",
    description: "A fungal infection characterized by rusty-colored spores on plant surfaces.",
    symptoms: [
      "Orange, yellow, or reddish-brown pustules on leaf undersides",
      "Distorted growth in severely affected plants",
      "Yellowing or browning of infected leaves",
      "Premature leaf drop"
    ],
    pesticides: [
      {
        name: "Sulfur Fungicide",
        description: "Effective against rust fungi when applied before infection becomes severe.",
        usage: "Apply at 7-10 day intervals, avoid using when temperatures exceed 85°F (29°C)."
      },
      {
        name: "Myclobutanil",
        description: "A systemic fungicide that provides both preventative and curative control.",
        usage: "Apply at first signs of disease and repeat according to product label instructions."
      }
    ]
  },
  {
    id: "healthy",
    name: "Healthy Leaf",
    description: "No disease or pest damage detected. The leaf appears to be healthy.",
    symptoms: [],
    pesticides: []
  }
];

// Mock API for disease detection
export const analyzeLeaf = (imageUrl: string): Promise<Disease> => {
  // In a real app, this would call an AI service or backend API
  return new Promise((resolve) => {
    // Simulate API call with random result for demo purposes
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * diseases.length);
      resolve(diseases[randomIndex]);
    }, 1500);
  });
};
