from django.shortcuts import render,redirect
from django.http import HttpResponse
from mainFiles.models import User
from .forms import PromptData
from mainFiles.templates import keys_andmsghist
from openai import OpenAI
import json
# Create your views here.

def home(request):
    if request.method == 'POST':
        form = PromptData(request.POST)
        if form.is_valid():
            user_input = form.cleaned_data['user_input']
            # Process user_input and get your result_text
            result_text = getRecipe(user_input)
            return render(request, 'index.html', {'form': form, 'result_text': result_text})
    else:
        form = PromptData()

    return render(request, 'index.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        city = request.POST.get('city')
        state = request.POST.get('state')

        user = User(FirstName=fname, LastName=lname, Email=email, City=city, State=state)
        user.save()
        
        return redirect('home')
    
    return render(request, 'signup.html')

def getRecipe(user_prompt):
    client = OpenAI(api_key=keys_andmsghist.API_KEY)
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role":"system","content":"You're a recipe generator which gives response in JSON. I'll provide a prompt with ingredients, flavors, origin, category, or mood, and you'll suggest a recipe. Your response should include the recipe name, ingredients, and instructions in a JSON format with keys: 'name', 'ingredients', and 'recipe'. Values for 'ingredients' and 'recipe' should be presented as lists, with each item in the ingredients list corresponding to an ingredient element, and each instruction in the recipe list following as the next element."},
        {"role": "user", "content":user_prompt}
      ]
    )

    obj_str=response.choices[0].message.content
    obj_str = obj_str.replace("\'", "\"")
    dictionary = json.loads(obj_str)
    return dictionary

def my_view(request):
    if request.method == 'POST':
        form = PromptData(request.POST)
        if form.is_valid():
            user_input = form.cleaned_data['user_input']
            # Process user_input and get your result_text
            result_text = getRecipe(user_input)
            return render(request, 'index.html', {'form': form, 'result_text': result_text})
    else:
        form = PromptData()

    return render(request, 'index.html', {'form': form})
