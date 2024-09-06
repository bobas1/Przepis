import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const FullWidthTextField = styled(TextField)({
    width: '100%', // Ustawienie szerokości na 100%
    margin: '10px 0', // Dodanie marginesu dla lepszego wyglądu
});

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Funkcja, która jest wywoływana po kliknięciu
    const handleClick = async () => {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2?q=${searchTerm || 'chicken'}&type=public&app_id=109ff6bb&app_key=b5f751458ae6e9fee62c2aec731f36aa`);
            const data = await response.json();
            console.log(data); // Tutaj możesz obsłużyć odpowiedź API np. zapisać ją w stanie
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <FullWidthTextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
