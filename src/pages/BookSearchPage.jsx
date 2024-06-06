import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';



const BookSearchPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [realTimeQuery, setRealTimeQuery] = useState('')
    const [results, setResults] = useState([]);
    const [realTimeSwitch, setRealTimeSwtich] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const searchBook = async () => {
        setIsLoading(true)
        console.log(isLoading)
        await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
            .then(response => setResults(response.data.docs))
            .catch(error => console.error('Error fetching data:', error))
        setIsLoading(false);
    }

    useEffect(() => {
        if (realTimeQuery.length > 2) {
            axios.get(`https://openlibrary.org/search.json?q=${realTimeQuery}&limit=10&page=1`)
                .then(response => setResults(response.data.docs))
                .catch(error => console.error('Error fetching data:', error))
        }
    }, [realTimeQuery]);

    const addToBookshelf = async (book) => {
        let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        await bookshelf.push(book);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        alert("Book added to your bookshelf!")
        // navigate("/mybookshelf")

    };

    const handleChange = (event) => {
        setRealTimeSwtich(event.target.checked)
    };

    return (
        <>
            {isLoading &&
                <Box >
                    <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", zIndex: 3 }} />
                    <Box sx={{ position: "absolute", top: "0", left: "0", background: "#88888894", height: "100vh", width: "100vw", zIndex: 2 }} />
                </Box>
            }
            <Box sx={{ my: 4 }}>
                <Box sx={{ mb: 4, width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant='h4' sx={{ mb: 1 }} >
                        Search book name!
                    </Typography>
                    <FormControlLabel
                        label="Realtime Search"
                        control={
                            <Switch checked={realTimeSwitch} onChange={handleChange} />
                        }
                    />
                    {realTimeSwitch ?
                        <>
                            <input
                                type="text"
                                value={realTimeQuery}
                                onChange={(e) => setRealTimeQuery(e.target.value)}
                                placeholder="Search for books"
                                style={{ padding: "0.5rem", width: "22rem" }}
                            />
                            <Link to="/mybookshelf">
                                <Button
                                    sx={{ m: 1, width: "22rem" }} variant="outlined" size="medium">
                                    My Bookshelf
                                </Button>
                            </Link>
                        </>
                        :
                        <>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for books"
                                style={{ padding: "0.5rem", width: "22rem" }}
                            />
                            <Box sx={{ display: "flex" }}>
                                <Button onClick={searchBook}
                                    sx={{ m: 1, width: "11rem" }} variant="contained" size="medium">
                                    Search Book
                                </Button>
                                <Link to="/mybookshelf">
                                    <Button
                                        sx={{ m: 1, width: "11rem" }} variant="outlined" size="medium">
                                        My Bookshelf
                                    </Button>
                                </Link>
                            </Box>
                        </>
                    }

                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                    {results.map((book) => (
                        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 300, minHeight: 200, paddingX: "1rem", paddingY: "0.25rem", marginY: 2, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;" }} variant="outlined">
                            <>
                                <CardContent sx={{ padding: 2 }}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                                        Edition Count: {book.edition_count}
                                    </Typography>
                                    <Typography sx={{ fontSize: "1.75rem" }} component="div">
                                        {book.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: "0.9rem" }} color="text.secondary">
                                        {book.author_name}
                                    </Typography>
                                </CardContent>
                                <Button onClick={() => addToBookshelf(book)} sx={{ mb: 1, py: 0.6 }} variant="contained" size="small">Add to bookshelf</Button>
                            </>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default BookSearchPage;