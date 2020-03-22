from django.db import models


# Create your models here.
class Test(models.Model):
  name = models.CharField(max_length=20)


class Contact(models.Model):
  name = models.CharField(max_length=200)
  age = models.IntegerField(default=0)
  email = models.EmailField()

  def __unicode__(self):
    return self.name


class Tag(models.Model):
  contact = models.ForeignKey(Contact, on_delete=models.CASCADE, )
  name = models.CharField(max_length=50)

  def __unicode__(self):
    return self.name


class User(models.Model):
  id = models.IntegerField(primary_key=True)
  username = models.CharField(max_length=20)
  password = models.CharField(max_length=20)


class Blog(models.Model):
  id = models.AutoField(primary_key=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
  title = models.CharField(max_length=50)
  content = models.TextField()
  time = models.DateTimeField(auto_now=True)
  urls = models.TextField()


