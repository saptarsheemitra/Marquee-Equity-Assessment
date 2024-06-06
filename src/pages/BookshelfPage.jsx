import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const BookshelfPage = () => {
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        setBookshelf(JSON.parse(localStorage.getItem('bookshelf')) || []);
    }, []);

    return (
        <div>
            <Box sx={{ my: 4, width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant='h4' sx={{ mb: 1, fontWeight: "bold" }} >
                    My Bookshelf
                </Typography>
                <Link to="/">
                    <Button
                        sx={{ my: 1, width: "15rem" }} variant="contained" size="medium">
                        Go to book search
                    </Button>
                </Link>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {bookshelf.map((book) => (
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
                            {/* <Button onClick={() => addToBookshelf(book)} sx={{ mb: 1,py:0.6 }} variant="contained" size="small">Add to bookshelf</Button> */}
                        </>
                    </Card>
                ))}
            </Box>

        </div>
    );
};

export default BookshelfPage;