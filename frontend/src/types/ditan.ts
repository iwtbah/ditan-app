export interface DitanDiscoveryCard {
  id: string;
  title: string;
  shopName: string;
  distance: string;
  imageUrl: string;
  tags: string[];
}

export interface DitanDiscoveryPayload {
  city: string;
  cards: DitanDiscoveryCard[];
}

export interface PublishStoreOption {
  id: string;
  name: string;
  city: string;
}
