import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput{
//     title: string,
//     amount: number,
//     type: string,
//     category: string;
// }

// OU

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//OU

//type TransactionInput = Pick <Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//Esse context entrega o objeto tanto de leitura "transactions" quanto o de escrita "TransactionInput"
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData); //o "as TransactionsContextData" é para tirar o erro do TS
                                    //isso acontence pq o valor default é um objeto.

//Aqui a função recebe as props(o conteúdo) do Children que está no App.tsx
//Função para leitura de informação
export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions') 
        .then(res =>setTransactions(res.data.transactions))
    } ,[])

//Fuction para escrever 
    async function createTransaction(transactionInput : TransactionInput){   
           const res = await api.post('/transactions',{
               ...transactionInput, 
               createdAt: new Date(),
                 
            })
           const { transaction } = res.data

           setTransactions([
               ...transactions, //conceito de imutabilidade... copia tudo que tem em transactions
               transaction,     //e adiciona a nova transaction
           ]);
    }

// no value são duas "{}" uma é pra indicar que está passando JS e outra pq está passando um objeto 
    return (
      <TransactionsContext.Provider value={{transactions, createTransaction}}>  
          {children}
      </TransactionsContext.Provider>  
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContext);    

    return context;
}