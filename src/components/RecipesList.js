import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)`
    height: 100%;
`;

export const RecipesList = ({ recipes }) => {
    return (
        <Grid container spacing={3}>
            {recipes.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            alt={recipe.recipe.label}
                            image={recipe.recipe.image}
                            sx={{ height: "220px" }}
                        />
                        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {recipe.recipe.label}
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                                {recipe.recipe.ingredientLines.map((ingredientLine, i) => (
                                    <Typography key={i} gutterBottom variant="body1" component="div">
                                        {ingredientLine}
                                    </Typography>
                                ))}
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default RecipesList