import { Web3Modal } from '@web3modal/html';

let web3ModalInstance: Web3Modal | null = null;

export const getWeb3Modal = () => {
  if (typeof window === 'undefined') return null;
  
  if (!web3ModalInstance) {
    web3ModalInstance = new Web3Modal({
      // your web3modal config here
    });
  }
  
  return web3ModalInstance;
};

export const clearWeb3Modal = () => {
  web3ModalInstance = null;
  // Clean up any existing custom elements
  if (window.customElements.get('wcm-button')) {
    // Can't undefine custom elements, but we can clean up related resources
    if (window.web3modal) {
      window.web3modal = undefined;
    }
  }
}; 