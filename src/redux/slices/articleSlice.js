import { createSlice } from '@reduxjs/toolkit';

// Hardcoded Article Data
const initialArticles = [
  {
    id: 'a1',
    title: 'What is Pre-diabetes?',
    category: 'Understanding Pre-diabetes',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-cd9185a5399c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: [
      'Pre-diabetes is a serious health condition where blood sugar levels are higher than normal, but not high enough yet to be diagnosed as type 2 diabetes. It means you are at a higher risk for developing type 2 diabetes, heart disease, and stroke.',
      'The good news is that pre-diabetes can often be reversed through lifestyle changes, such as healthy eating and regular physical activity. Many people with pre-diabetes don\'t have any symptoms, so regular check-ups with your doctor are important.',
      'Key indicators include a fasting blood sugar level between 100 and 125 mg/dL, or an A1C level between 5.7% and 6.4%.',
    ],
  },
  {
    id: 'a2',
    title: 'The Glycemic Index Explained',
    category: 'Diet & Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1616715694770-b7470f1a9d0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: [
      'The Glycemic Index (GI) is a system that ranks carbohydrate-containing foods by how much they raise blood sugar levels after eating. Foods are ranked on a scale of 0 to 100.',
      '**Low GI foods (55 or less):** Cause a slower, more gradual rise in blood sugar. Examples include most vegetables, fruits, whole grains, and legumes.',
      '**Medium GI foods (56-69):** Have a moderate effect on blood sugar. Examples include whole wheat bread, brown rice, and sweet potatoes.',
      '**High GI foods (70 or more):** Cause a rapid spike in blood sugar. Examples include white bread, white rice, sugary cereals, and processed snacks.',
      'For pre-diabetes reversal, focusing on low and medium GI foods can help manage blood sugar levels more effectively.',
    ],
  },
  // Add more articles
];

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    list: initialArticles,
    selectedArticle: null,
  },
  reducers: {
    selectArticle: (state, action) => {
      state.selectedArticle = state.list.find(art => art.id === action.payload);
    },
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
});

export const { selectArticle, clearSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;