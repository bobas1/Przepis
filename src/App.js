import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import MediaCard from './components/MediaCard';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import { RecepieSearchClient } from './api/RecepieSearchClient';




const StyledGrid = styled(Grid)`
    && {
        background-color: lightgray;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
        margin-top: 20px;

        &:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
    }
`;


function App() {
    const [recipes, setRecipes] = useState([]); // Zmienna do przechowywania przepisów
    const [filteredRecipes, setFilteredRecipes] = useState([]); // Przechowywanie przefiltrowanych przepisów
    const [searchValue, setSearchValue] = useState(''); // Wartość wyszukiwana
    const [loading, setLoading] = useState(true); // Stan ładowania
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const client = new RecepieSearchClient();

    // Filtrowanie przepisów na podstawie wyszukiwanego hasła
    useEffect(() => {
        if (!searchValue) {
            setFilteredRecipes(recipes); // Jeśli brak wyszukiwania, pokaż wszystkie przepisy
        } else {
            const filtered = recipes.filter((recipe) =>
                recipe.label.toUpperCase().includes(searchValue.toUpperCase())
            );
            setFilteredRecipes(filtered);
        }
    }, [searchValue, recipes]);

    // Pobieranie przepisów przy montowaniu komponentu
    useEffect(() => {
        const fetchInitialRecipes = async () => {
            try {
                const initialRecipes = await client.getRecipes();
                setRecipes(initialRecipes); // Zapisanie wszystkich przepisów
                setFilteredRecipes(initialRecipes); // Pokaż początkowo wszystkie przepisy
            } catch (error) {
                console.error('Error fetching initial recipes:', error);
            } finally {
                setLoading(false); // Ustawienie zakończenia ładowania
            }
        };
        fetchInitialRecipes();
    }, [client]);

    return (
        <>
            <Banner />
            <SearchBar setSearchValue={setSearchValue} /> {/* Przekazanie setSearchValue */}
            <StyledGrid container spacing={3}>
                {!loading && // Wyświetlanie wyników, gdy ładowanie zakończone
                    filteredRecipes.map((recipe) => (
                        <Grid item key={recipe.uri} xs={12} sm={6} md={4} lg={3}>
                            <MediaCard recipe={recipe} /> {/* Wyświetlanie karty z przepisem */}
                        </Grid>
                    ))}
            </StyledGrid>
        </>
    );
};

export default App;
