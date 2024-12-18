import { fetchCategories } from "../backend";
import Category from "../types/Category";
import React, { useEffect, useState } from "react";
// There is a bug in the following import statement with the linter (Cannot find SelectChangeEvent)
// eslint-disable-next-line import/named
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

type CategoryListProps = {
    onCategoryChange: (category: Category | null) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        getCategories();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedCategoryId = event.target.value as string;
        const selectedCategory = categories.find((cat) => cat.id === parseInt(selectedCategoryId)) || null;
        setCategory(selectedCategory);
        onCategoryChange(selectedCategory);
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id="category-select"
                value={category ? category.id.toString() : ""}
                onChange={handleChange}
                label="Category"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id.toString()}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategoryList;
