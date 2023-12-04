from django import forms

class PromptData(forms.Form):
    user_input = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'placeholder': 'Try Ingredients...',
            'class': 'form-control custom-textbox-class',
            'style': '''
                    width: fit-content; 
                    height: fit-content; 
                    font-size: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                    text-align: center;
                    
                    ''',  # Set your desired width and height
        })
    )