import { parseDateBrToTime } from "./formatters";
import { useState, useMemo } from "react";

export type tipoOrdenacao = 'recente' | 'alfabetico' | 'naoVisualizado';

export function ordenacao<T>(
    data: T[],
    opcao: tipoOrdenacao,
    dataChave: keyof T,
    labelChave: keyof T,
    vistoChave: keyof T,
    direcao: 'asc' | 'desc' = 'asc' 
): T[] {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
        let resultado = 0;

        switch (opcao) {
            case 'recente':
                resultado = parseDateBrToTime(b[dataChave] as string) - parseDateBrToTime(a[dataChave] as string);
                break;
            
            case 'alfabetico':
                resultado = String(a[labelChave]).localeCompare(String(b[labelChave]));
                break;

            case 'naoVisualizado':
                resultado = a[vistoChave] === b[vistoChave] ? 0 : a[vistoChave] ? 1 : -1;
                break;
            
            default:
                return 0;
        }

        
        return direcao === 'asc' ? resultado : resultado * -1;
    });
};

export function useOrdenacao<T>(
    dadosIniciais: T[],
    ordenacaoPadrao: tipoOrdenacao,
    dataChave: keyof T,
    labelChave: keyof T,
    vistoChave: keyof T
) {

    const [ordenarPor, setOrdenarPor] = useState<tipoOrdenacao>(ordenacaoPadrao);
    const [direcao, setDirecao] = useState<'asc' | 'desc'>('asc');

    const handleSort = (novaOrdenacao: tipoOrdenacao) => {
        if (ordenarPor === novaOrdenacao) {
            setDirecao((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrdenarPor(novaOrdenacao);
            setDirecao('asc');
        }
    };

    const dadosOrdenados = useMemo(() => {
        return ordenacao(dadosIniciais, ordenarPor, dataChave, labelChave, vistoChave, direcao);
    }, [dadosIniciais, ordenarPor, direcao, dataChave, labelChave, vistoChave]);

    return {
        dadosOrdenados,
        ordenarPor,
        direcao,
        handleSort
    };
}
    
