#include<bits/stdc++.h>
using namespace std;
int findmax(int n,int a[])
{
    //write your code here
}
void inputarray(int n,int a[])
{
    for(int i=0;i<n;i++)
    {
        cin>>a[i];    
    }
}
void printarray(int n,int a[])
{
    for(int i=0;i<n;i++)
    {
        cout<<a[i]<<" ";    
    }
}

int main()
{
   freopen("./code/64cd06994db37c9bb7b945ab_20239265313_input.txt","r",stdin); 
 
     freopen("input.txt","r",stdin);
     freopen("output.txt","w",stdout);
     int n;
     cin>>n;
     int a[n];
     inputarray(n,a);
     int max=findmax(n,a);
     cout<<max;
}