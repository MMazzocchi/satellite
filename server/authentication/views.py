from django.shortcuts import render

from django.contrib.auth import authenticate, login

# Validate this request and verify that the user's credentials.
def verification(request):
    context = {
        "valid":    True,
        "redirect": "/",
        "errors":   []
    }

    # Make sure we got a username and password
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']

        # Make sure they're not blank.
        if len(username) > 0 and len(password) > 0:

            # Make sure this user's credentials are valid.
            user = authenticate(username=username, password=password)
            if user is not None:

                # Make sure this user hasn't been disabled.
                if user.is_active:
                    login(request, user)
                    context['valid'] = True
                else:
                    context['valid'] = False
                    context['errors'].append("Your account has been disabled.")
            else:
                context['valid'] = False
                context['errors'].append("The username/password you entered " +
                              "did not match our records. Try entering your " +
                              "login again.")
        else:
            context['valid'] = True
            if len(username) == 0:
                context['errors'].append("Username cannot be blank.")
            if len(password) == 0:
                context['errors'].append("Password cannot be blank.")
    else:
        context['valid'] = False
        if 'username' not in request.POST:
            context['errors'].append("No username was received.")
        if 'password' not in request.POST:
            context['errors'].append("No password was received.")

    return render(request, "json/verification.json", context)
