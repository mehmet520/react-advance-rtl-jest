import { describe, test, expect } from "@jest/globals";
import { filtreleKullanicilar } from "../utils/filtreleKullanicilar";

// Einheitstest 1: filtreleKullanicilar (reine Funktion)
describe ("filtreleKullanicilar", () => {
    const kullanicilarListesi = [
        {id:1, ad: 'Hasan'},
        {id:2, ad: 'Ebu Bekir'},
        {id:3, ad: 'Ömer'},
    ]

    test(" arama boşsa tüm listeyi döndürür", () => {
        const tumListe = filtreleKullanicilar(kullanicilarListesi, "")
        expect(tumListe).toEqual(kullanicilarListesi)
    })

    test(" i̇sim içinde arama metnini içeren ögelerin listesini döndürür", () => {
        const filtrelenmisListe = filtreleKullanicilar(kullanicilarListesi, "e")
        expect(filtrelenmisListe).toEqual([
        {id:2, ad: 'Ebu Bekir'},
        {id:3, ad: 'Ömer'},
    ])
    })

    test(" büyük küçük harfle duyarlı değildir", ()=>{
        const filtrelenmisListe = filtreleKullanicilar(kullanicilarListesi, "R")
        expect(filtrelenmisListe).toEqual([
        {id:2, ad: 'Ebu Bekir'},
        {id:3, ad: 'Ömer'},
    ])
    })
})