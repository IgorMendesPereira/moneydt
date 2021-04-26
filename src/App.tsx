import { useState } from "react";
import Modal from "react-modal"
import { Dashbord } from "./components/Dashboard";
import { Header } from "./components/Header"
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global"

import { TransactionsProvider } from "./hooks/useTransactions"

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false);
  }

  return (
// O que está dentro do TransactionsProvider é um CHILDREN, esse Children envia conteúdo para o context
    <TransactionsProvider> 
      <Header onOpenNewTransactionModal = { handleOpenNewTransactionModal } />
      <Dashbord />

      <NewTransactionModal
        isOpen = { isNewTransactionModalOpen }
        onRequestClose = { handleCloseNewTransactionModal }
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}