#include<bits/stdc++.h>
using namespace std;

int binarysearch(int n,int a[],int key)
{
    //write your code here
    int low=0,high=n-1;
    while(low<=high)
    {
       int mid=(high+low)/2;
       if(a[mid]==key)
       return mid;
       if(a[mid]<key)
       low=mid+1;
       else
       high=mid-1;
    }
    return(-1);
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
     freopen("input.txt","r",stdin);
     freopen("output.txt","w",stdout);
     int n;
     cin>>n;
     int a[n];
     inputarray(n,a);
     int key;
     cin>>key;
     int pos=binarysearch(n,a,key);
     cout<<pos;
}