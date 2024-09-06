import React, {useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const FullWidthTextField = styled(TextField)({
    width: '100%', // Ustawienie szerokości na 100%
    margin: '10px 0', // Dodanie marginesu dla lepszego wyglądu
});

//interface SearchBarProps {
//    setRecipes: (recipes: any[]) => void; // Typ funkcji do przekazywania przepisów
//}

//export const SearchBar: React.FC<SearchBarProps> = ({ setRecipes }) => {
//    const [searchTerm, setSearchTerm] = useState(''); // Stan dla wyszukiwanej frazy

export const SearchBar = ({ setRecipes }) => {
    const [query, setQuery] = useState("chicken"); // Stan dla wyszukiwanej frazy

    // Funkcja do pobierania przepisów
    async function fetchRecipes() {
        try {
            const response = await fetch(
                `https://api.edamam.com/api/recipes/v2?q=${query}&type=public&app_id=109ff6bb&app_key=b5f751458ae6e9fee62c2aec731f36aa`
            );
            const data = await response.json();
            setRecipes(data.hits); // Zapisanie przepisów w stanie komponentu nadrzędnego
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

  

    // Funkcja, która jest wywoływana po kliknięciu przycisku wyszukiwania
    const handleClick = async () => {
        await fetchRecipes(); // Wywołanie funkcji pobierającej przepisy
    };

    return (
        <FullWidthTextField
            label="Wyszukaj"
            variant="outlined"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Aktualizacja frazy wyszukiwania
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClick}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
